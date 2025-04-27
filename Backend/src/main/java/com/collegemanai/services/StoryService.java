package com.collegemanai.services;

import java.util.List;

import com.collegemanai.exception.StoryException;
import com.collegemanai.exception.UserException;
import com.collegemanai.model.Story;

public interface StoryService {

	public Story createStory(Story story,Integer userId) throws UserException;
	
	public List<Story> findStoryByUserId(Integer userId) throws UserException, StoryException;
	public List<Story> findStoriesByFollowedUsers(Integer userId) throws StoryException, UserException;
	
}
