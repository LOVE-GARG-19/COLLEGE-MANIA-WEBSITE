package com.collegemanai.services;

import java.util.List;

import com.collegemanai.exception.UserException;
import com.collegemanai.model.User;
import com.collegemanai.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collegemanai.model.Reels;
import com.collegemanai.repository.ReelRepository;

@Service
public class ReelServiceImplementation implements ReelService {
	
	@Autowired
	private ReelRepository reelRepository;


	@Autowired
	private UserRepository userRepository;
	@Override
	public Reels createReels(Reels reel) {
		
		return reelRepository.save(reel);
	}
	

	@Override
	public void deleteReels(Integer reelId) {
		reelRepository.deleteById(reelId);
		
	}

	@Override
	public void editReels(Reels reel) {
		reelRepository.save(reel);
		
	}


	@Override
	public List<Reels> getAllReels() {
        return reelRepository.findAll();
	}
	@Override
	public List<Reels> getReelsByUserId(Integer userId) throws UserException {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserException("User not found with ID: " + userId));
		return reelRepository.findByUser(user);
	}
}
