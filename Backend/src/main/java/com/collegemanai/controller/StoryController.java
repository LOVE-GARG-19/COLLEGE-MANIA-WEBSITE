package com.collegemanai.controller;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.collegemanai.dto.StoryDto;
import com.collegemanai.dto.mapper.StoryDtoMapper;
import com.collegemanai.exception.StoryException;
import com.collegemanai.exception.UserException;
import com.collegemanai.model.Story;
import com.collegemanai.model.User;
import com.collegemanai.services.StoryService;
import com.collegemanai.services.UserService;

import static com.fasterxml.jackson.databind.type.LogicalType.Map;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

	@Autowired
	private StoryService storyService;

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<StoryDto> createStoryHandler(@RequestBody Story story, @RequestHeader("Authorization") String token) throws UserException {
		User reqUser = userService.findUserProfile(token);
		Story createdStory = storyService.createStory(story, reqUser.getId());

		StoryDto storyDto = StoryDtoMapper.toStoryDto(createdStory);
		return new ResponseEntity<>(storyDto, HttpStatus.OK);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<List<StoryDto>> findAllStoryByUserIdHandler(@PathVariable Integer userId) throws UserException, StoryException {
		List<Story> stories = storyService.findStoryByUserId(userId);
		System.out.println("stories userid --------- ");
		List<StoryDto> storyDtos = StoryDtoMapper.toStoryDtos(stories);
		return new ResponseEntity<>(storyDtos, HttpStatus.OK);
	}
	@GetMapping("/follow_user_stories")
	public ResponseEntity<?> getFollowedUserStories(@RequestHeader("Authorization") String token) {
		try {
			System.out.println("Request coming for follow user stories with token: " + token);

			// Validate and fetch logged-in user
			User loggedInUser = userService.findUserProfile(token);
			System.out.println("LoggedInUser in follow user stories-------------------------");

			// Get stories of followed users
			List<Story> stories = storyService.findStoriesByFollowedUsers(loggedInUser.getId());
			System.out.println("Stories in follow user stories-------------------------");

			// Convert to DTOs
			List<StoryDto> storyDtos = StoryDtoMapper.toStoryDtos(stories);
			System.out.println("DTO stories in follow user stories-------------------------");

			return new ResponseEntity<>(storyDtos, HttpStatus.OK);

		} catch (UserException | StoryException e) {
			// Custom known exceptions
			HashMap<String,String> errorResponse = new HashMap<>();
			errorResponse.put("error", e.getMessage());
			return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			// Fallback for unexpected exceptions
			e.printStackTrace();
			HashMap<String,String> errorResponse = new HashMap<>();
			errorResponse.put("error", "Something went wrong. Please try again later.");
			return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}




}
