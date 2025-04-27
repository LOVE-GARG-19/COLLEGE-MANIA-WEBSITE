package com.collegemanai.services;

import java.util.List;

import com.collegemanai.exception.UserException;
import com.collegemanai.model.Reels;

public interface ReelService {
	
	public Reels createReels(Reels reel);
	
	public void deleteReels(Integer reelId);
	
	public void editReels(Reels reel);
	
	public List<Reels> getAllReels();
	List<Reels> getReelsByUserId(Integer userId) throws UserException;
}
