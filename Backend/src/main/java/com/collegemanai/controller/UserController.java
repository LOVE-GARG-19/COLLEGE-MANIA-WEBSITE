package com.collegemanai.controller;

import java.util.List;
import java.util.stream.Collectors;

import com.collegemanai.dto.UserDto;
import com.collegemanai.dto.UserProfileDto;
import com.collegemanai.dto.mapper.UserDtoMapper;
import com.collegemanai.dto.mapper.UserProfileDtoMapper;
import com.collegemanai.exception.UserException;
import com.collegemanai.model.User;
import com.collegemanai.response.MessageResponse;
import com.collegemanai.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("/id/{id}")
	public ResponseEntity<UserProfileDto> getUserById(@PathVariable Integer id) throws UserException {
		User user = userService.findUserById(id);
		return new ResponseEntity<>(UserProfileDtoMapper.toUserProfileDto(user), HttpStatus.OK);
	}

	@GetMapping("/username/{username}")
	public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) throws UserException {
		User user = userService.findUserByUsername(username);
		return new ResponseEntity<>(UserDtoMapper.toUserDto(user), HttpStatus.OK);
	}

	@PutMapping("/{followUserId}/follow")
	public ResponseEntity<UserProfileDto> followUser(
			@RequestHeader("Authorization") String token,
			@PathVariable Integer followUserId) throws UserException {
		System.out.println("follow kara hu id wala ko ");
		User reqUser = userService.findUserProfile(token);
		User updatedUser = userService.followUser(reqUser.getId(), followUserId);
		return new ResponseEntity<>(UserProfileDtoMapper.toUserProfileDto(updatedUser), HttpStatus.OK);
	}

	@PutMapping("/{unfollowUserId}/unfollow")
	public ResponseEntity<UserProfileDto> unfollowUser(
			@RequestHeader("Authorization") String token,
			@PathVariable Integer unfollowUserId) throws UserException {
		System.out.println("follow kara hu id wala ko ");
		User reqUser = userService.findUserProfile(token);
		User updatedUser = userService.unfollowUser(reqUser.getId(), unfollowUserId);
		return new ResponseEntity<>(UserProfileDtoMapper.toUserProfileDto(updatedUser), HttpStatus.OK);
	}

	@GetMapping("/profile")
	public ResponseEntity<UserProfileDto> getCurrentUserProfile(
			@RequestHeader("Authorization") String token) throws UserException {
		User user = userService.findUserProfile(token);
		return new ResponseEntity<>(UserProfileDtoMapper.toUserProfileDto(user), HttpStatus.OK);
	}

	@GetMapping("/bulk/{userIds}")
	public ResponseEntity<List<UserDto>> getUsersByIds(@PathVariable List<Integer> userIds) {
		List<User> users = userService.findUsersByUserIds(userIds);

		List<UserDto> userDtos = users.stream()
				.map(UserDtoMapper::toUserDto)
				.collect(Collectors.toList());
		return new ResponseEntity<>(userDtos, HttpStatus.OK);
	}

	@GetMapping("/search")
	public ResponseEntity<List<UserDto>> searchUsers(@RequestParam("q") String query) throws UserException {
		List<User> users = userService.searchUser(query);
		if (users.isEmpty()) {

		}
		List<UserDto> userDtos = users.stream()
				.map(UserDtoMapper::toUserDto)
				.collect(Collectors.toList());
//		return new ResponseEntity<>(userDtos, HttpStatus.OK);
		return ResponseEntity.ok(userDtos);
	}

	@PutMapping("/account/edit")
	public ResponseEntity<UserProfileDto> updateUserDetails(
			@RequestHeader("Authorization") String token,
			@RequestBody User updatedUser) throws UserException {
		User existingUser = userService.findUserProfile(token);
		User updated = userService.updateUserDetails(updatedUser, existingUser);
		return new ResponseEntity<>(UserProfileDtoMapper.toUserProfileDto(updated), HttpStatus.OK);
	}

//	@GetMapping("/popular")
//	public ResponseEntity<List<UserDto>> getPopularUsers() {
//		List<User> popularUsers = userService.popularUser();
//		List<UserDto> userDtos = popularUsers.stream()
//				.map(UserDtoMapper::toUserDto)
//				.collect(Collectors.toList());
//		return new ResponseEntity<>(userDtos, HttpStatus.OK);
//	}

	@GetMapping("/popular")
	public ResponseEntity<List<UserDto>> getPopularUsers() {
		// `popularUser()` method will now internally use SecurityContext to get current user
		List<User> popularUsers = userService.popularUser();
		List<UserDto> userDtos = popularUsers.stream()
				.map(UserDtoMapper::toUserDto)
				.collect(Collectors.toList());

		return new ResponseEntity<>(userDtos, HttpStatus.OK);
	}
}
