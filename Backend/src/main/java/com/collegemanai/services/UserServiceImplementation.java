package com.collegemanai.services;

import com.collegemanai.config.JwtProvider;
import com.collegemanai.exception.UserException;
import com.collegemanai.model.PasswordResetToken;
import com.collegemanai.model.User;
import com.collegemanai.repository.PasswordResetTokenRepository;
import com.collegemanai.repository.UserRepository;
import com.collegemanai.utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	private UserRepository repo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private PasswordResetTokenRepository passwordResetTokenRepository;

	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public User registerUser(User user) throws UserException {
		Optional<User> isEmailExist = repo.findByEmail(user.getEmail());
		if (isEmailExist.isPresent()) {
			throw new UserException("Email Already Exist");
		}

		if (user.getEmail() == null || user.getPassword() == null || user.getName() == null || user.getUsername() == null) {
			throw new UserException("Email, Password, First Name, and Last Name are required");
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return repo.save(user);
	}

	@Override
	public User findUserById(Integer userId) throws UserException {
		return repo.findById(userId)
				.orElseThrow(() -> new UserException("User not found with ID: " + userId));
	}

	@Override
	public User followUser(Integer reqUserId, Integer followUserId) throws UserException {
		User followUser = findUserById(followUserId);
		User reqUser = findUserById(reqUserId);

		if (Objects.equals(reqUser.getId(), followUser.getId())) {
			throw new UserException("You cannot follow yourself");
		}
		System.out.println("calling and adding user");
		followUser.getFollower().add(reqUser);
		reqUser.getFollowing().add(followUser);
		System.out.println("user");
		repo.save(followUser);
		return repo.save(reqUser); // return updated user
	}

	@Override
	public User unfollowUser(Integer reqUserId, Integer unfollowUserId) throws UserException {
		User unfollowUser = findUserById(unfollowUserId);
		User reqUser = findUserById(reqUserId);

		if (Objects.equals(reqUser.getId(), unfollowUser.getId())) {
			throw new UserException("You cannot unfollow yourself");
		}

		unfollowUser.getFollower().remove(reqUser);
		reqUser.getFollowing().remove(unfollowUser);

		repo.save(unfollowUser);
		return repo.save(reqUser);


	}

	@Override
	public User findUserProfile(String token) throws UserException {
//		token = token.substring(7); // Remove "Bearer "
		String username = jwtProvider.getEmailFromJwtToken(token);
		return repo.findByEmail(username)
				.orElseThrow(() -> new UserException("User not found with email: " + username));
	}

	@Override
	public User findUserByUsername(String username) throws UserException {
		return repo.findByUsername(username)
				.orElseThrow(() -> new UserException("User not found with username: " + username));
	}

	@Override
	public User findUserByEmail(String email) throws UserException {
		return repo.findByEmail(email).orElseThrow(() -> new UserException("User not found with email: " + email));
	}

	@Override
	public List<User> findUsersByUserIds(List<Integer> userIds) {
		return repo.findAllUserByUserIds(userIds);
	}

	@Override
	public List<User> searchUser(String query) throws UserException {
		List<User> users = repo.findByQuery(query);
		if (users.isEmpty()) throw new UserException("No users found for the query");
		return users;
	}

	@Override
	public User updateUserDetails(User updatedUser, User existingUser) throws UserException {
		if (!updatedUser.getId().equals(existingUser.getId())) {
			throw new UserException("You can't update another user");
		}

		if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
		if (updatedUser.getBio() != null) existingUser.setBio(updatedUser.getBio());
		if (updatedUser.getName() != null) existingUser.setName(updatedUser.getName());
		if (updatedUser.getUsername() != null) existingUser.setUsername(updatedUser.getUsername());
		if (updatedUser.getMobile() != null) existingUser.setMobile(updatedUser.getMobile());
		if (updatedUser.getGender() != null) existingUser.setGender(updatedUser.getGender());
		if (updatedUser.getWebsite() != null) existingUser.setWebsite(updatedUser.getWebsite());
		if (updatedUser.getImage() != null) existingUser.setImage(updatedUser.getImage());

		return repo.save(existingUser);
	}

//	@Override
//	public List<User> popularUser() {
//		List<User> users = repo.findAll();
//		UserUtil.sortUserByNumberOfPost(users);
//
//		return users.size() > 5 ? users.subList(0, 5) : users;
//	}
public List<User> popularUser() {
	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	String currentUserEmail = auth.getName(); // assuming username is email

	User currentUser = repo.findByEmail(currentUserEmail)
			.orElseThrow(() -> new UsernameNotFoundException("User not found"));
	List<User> users = repo.findAll();
		UserUtil.sortUserByNumberOfPost(users);
	// Now you can use currentUser to filter out self etc.
	return users.stream()
			.filter(user -> !user.getId().equals(currentUser.getId()))
			.collect(Collectors.toList());
}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		String email = jwtProvider.getEmailFromJwtToken(jwt);
		return repo.findByEmail(email)
				.orElseThrow(() -> new UserException("User not found with email: " + email));
	}


	@Override
	public void updatePassword(User user, String newPassword) {
		user.setPassword(passwordEncoder.encode(newPassword));
		repo.save(user);
	}
	@Override
	public void sendPasswordResetEmail(User user) {
		String resetToken = UUID.randomUUID().toString();
		Date expiryDate = calculateExpiryDate();

		PasswordResetToken token = new PasswordResetToken(resetToken, user, expiryDate);
		passwordResetTokenRepository.save(token);

		String link = "http://localhost:3000/reset-password?token=" + resetToken;
		sendEmail(user.getEmail(), "Password Reset", "Click to reset your password: " + link);
	}
	private void sendEmail(String to, String subject, String message) {
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(to);
		mail.setSubject(subject);
		mail.setText(message);
		javaMailSender.send(mail);
	}

	private Date calculateExpiryDate() {
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		cal.add(Calendar.MINUTE, 10);
		return cal.getTime();
	}
}
