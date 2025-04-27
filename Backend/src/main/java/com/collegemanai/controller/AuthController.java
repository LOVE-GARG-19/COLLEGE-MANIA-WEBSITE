package com.collegemanai.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.collegemanai.config.JwtProvider;
import com.collegemanai.exception.UserException;
import com.collegemanai.model.User;
import com.collegemanai.repository.UserRepository;
import com.collegemanai.request.LoginRequest;
import com.collegemanai.response.AuthResponse;
import com.collegemanai.services.CustomeUserServiceImplementation;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private JwtProvider jwtProvider;
	private CustomeUserServiceImplementation customUserDetails;

	public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider,
			CustomeUserServiceImplementation customUserDetails) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtProvider = jwtProvider;
		this.customUserDetails = customUserDetails;

	}

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@Valid @RequestBody User user) throws UserException {
		System.out.println(user.toString());
		String userName = user.getUsername();
		String email = user.getEmail();
		String password = user.getPassword();
		String fullName = user.getName();
		String gender=user.getGender();
		
		System.out.println("email "+email+" - "+fullName);

		Optional<User> isEmailExist = userRepository.findByEmail(email);
		Optional<User> isUsernameExist = userRepository.findByUsername(userName);

		if (isEmailExist.isPresent()) {

			throw new UserException("Email Is Already Used With Another Account");
		}
		if(isUsernameExist.isPresent()){
			throw new UserException("UserName Is Already Used With Another Account");
		}

	
		User createdUser = new User();
		createdUser.setUsername(userName);
		createdUser.setEmail(email);
		createdUser.setName(fullName);
		createdUser.setGender(gender);
		createdUser.setPassword(passwordEncoder.encode(password));
	

		User savedUser = userRepository.save(createdUser);

		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);

		AuthResponse authResponse=new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Registration Successfull");

		return new ResponseEntity<>(authResponse, HttpStatus.OK);

	}
	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest) throws UserException {
		String username = loginRequest.getEmail();
		String password = loginRequest.getPassword();
		Authentication authentication = authenticate(username, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtProvider.generateToken(authentication);
		AuthResponse authResponse = new AuthResponse();

		authResponse.setMessage("Login Success");
		authResponse.setJwt(token);

		return new ResponseEntity<>(authResponse, HttpStatus.OK);
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = customUserDetails.loadUserByUsername(username);

		if (userDetails == null || !passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid username or password");
		}

		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

//	@PostMapping("/signin")
//	public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest) throws UserException {
//
//		String username = loginRequest.getEmail();
//		String password = loginRequest.getPassword();
//		System.out.println(username + " ----- " + password);
//		Authentication authentication = authenticate(username, password);
//		SecurityContextHolder.getContext().setAuthentication(authentication);
//		String token = jwtProvider.generateToken(authentication);
//		AuthResponse authResponse = new AuthResponse();
//
//		authResponse.setMessage("Login Success");
//		authResponse.setJwt(token);
//
//		return new ResponseEntity<>(authResponse, HttpStatus.OK);
//	}
//
//	private Authentication authenticate(String username, String password) {
//		UserDetails userDetails = customUserDetails.loadUserByUsername(username);
//
//		System.out.println("sign in userDetails - " + userDetails);
//
//		if (userDetails == null) {
//			System.out.println("sign in userDetails - null " + userDetails);
//			throw new BadCredentialsException("Invalid username or password");
//		}
//		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
//			System.out.println("sign in userDetails - password not match " + userDetails);
//			throw new BadCredentialsException("Invalid username or password");
//		}
//		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//	}
}
