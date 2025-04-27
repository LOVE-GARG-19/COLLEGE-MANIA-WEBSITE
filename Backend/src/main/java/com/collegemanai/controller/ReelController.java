package com.collegemanai.controller;

import java.util.List;

import com.collegemanai.dto.ReelsDto;
import com.collegemanai.dto.mapper.ReelsDtoMapper;
import com.collegemanai.exception.PostException;
import com.collegemanai.exception.UserException;
import com.collegemanai.model.Reels;
import com.collegemanai.model.User;
import com.collegemanai.response.MessageResponse;
import com.collegemanai.services.ReelService;
import com.collegemanai.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reels")
public class ReelController {

	@Autowired
	private ReelService reelService;

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<ReelsDto> createReelHandler(@RequestBody Reels reel, @RequestHeader("Authorization") String token) throws UserException {
		User user = userService.findUserProfile(token);
		reel.setUser(user);

		Reels createdReel = reelService.createReels(reel);
		ReelsDto reelsDto = ReelsDtoMapper.toReelsDto(createdReel);

		return new ResponseEntity<>(reelsDto, HttpStatus.CREATED);
	}

	@GetMapping("/")
	public ResponseEntity<List<ReelsDto>> getAllReelHandler() {
		List<Reels> reels = reelService.getAllReels();
		List<ReelsDto> reelsDtos = ReelsDtoMapper.toReelsDtos(reels);
		return new ResponseEntity<>(reelsDtos, HttpStatus.OK);
	}



	@DeleteMapping("/delete/{reelId}")
	public ResponseEntity<MessageResponse> deleteReelHandler(@PathVariable Integer reelId) throws PostException {
		reelService.deleteReels(reelId);
		return new ResponseEntity<>(new MessageResponse("Reel Deleted Successfully"), HttpStatus.OK);
	}
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<ReelsDto>> getReelsByUserId(@PathVariable Integer userId) throws UserException {
		List<Reels> reels = reelService.getReelsByUserId(userId);
		List<ReelsDto> reelsDtos = ReelsDtoMapper.toReelsDtos(reels);
		return new ResponseEntity<>(reelsDtos, HttpStatus.OK);
	}
}
