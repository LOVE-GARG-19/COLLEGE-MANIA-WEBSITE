package com.collegemanai.services;

import java.util.List;
import com.collegemanai.exception.UserException;
import com.collegemanai.model.User;

public interface UserService {
	
	public User registerUser(User user) throws UserException;
	
	public User findUserById(Integer userId) throws UserException;
	
	public User findUserProfile(String token) throws UserException;
	
	public User findUserByUsername(String username) throws UserException;

	public User findUserByEmail(String email) throws UserException;
	
	public User followUser(Integer reqUserId,Integer followUserId) throws UserException;
	
	public User unfollowUser(Integer reqUserId, Integer unfollowUserId) throws UserException;
	
	public List<User> findUsersByUserIds(List<Integer> userIds);
	
	public List<User> searchUser(String query) throws UserException;
	
	public List<User> popularUser();

	public void updatePassword(User user, String newPassword);

	// Send password reset email
	public void sendPasswordResetEmail(User user);

	public User findUserProfileByJwt(String jwt) throws UserException;

	public User updateUserDetails(User updatedUser, User existingUser) throws UserException;
	
	
}
