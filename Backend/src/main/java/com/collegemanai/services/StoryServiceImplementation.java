package com.collegemanai.services;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.collegemanai.exception.StoryException;
import com.collegemanai.exception.UserException;
import com.collegemanai.model.Story;
import com.collegemanai.model.User;
import com.collegemanai.repository.StoryRepository;

@Service
public class StoryServiceImplementation implements StoryService {
	
	@Autowired
	private StoryRepository storyRepo;
	
	@Autowired
	private UserService userService;

	@Override
	public Story createStory(Story story, Integer userId) throws UserException {
		User user = userService.findUserById(userId);

		story.setUser(user); // ✅ Direct user set
		story.setTimestamp(LocalDateTime.now());
		return storyRepo.save(story);
		
	}

	@Override
	public List<Story> findStoryByUserId(Integer userId) throws UserException,StoryException {
		
		User user = userService.findUserById(userId);

//		List<Story>  stories = user.getStories();
		List<Story> stories = storyRepo.findByUserId(userId);

		if(stories.isEmpty()) {
			throw new StoryException("This user Don't have any Story");
		}
		
		return stories;
	}
	public List<Story> findStoriesByFollowedUsers(Integer userId) throws UserException {
		User user = userService.findUserById(userId);

		// Get the list of IDs of users the logged-in user is following
		List<Integer> followedUserIds = new ArrayList<>();
		for (User followedUser : user.getFollowing()) {
			followedUserIds.add(followedUser.getId());
		}

		// Defensive: If not following anyone, return empty list
		if (followedUserIds.isEmpty()) {
			return new ArrayList<>();
		}
        // ✅ Include self userId
		followedUserIds.add(user.getId());
		// Fetch stories of the followed users
		List<Story> stories = storyRepo.findStoriesByUserIds(followedUserIds);

		return stories; // Even if empty, no problem
	}




}
