package com.collegemanai.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {

	private Integer id;
	private String username;
	private String email;
	private String name;
	private String mobile;
	private String website;
	private String bio;
	private String gender;
	private String image;

	private Set<UserDto> follower = new HashSet<>();
	private Set<UserDto> following = new HashSet<>();
	private List<StoryDto> stories = new ArrayList<>();
	private List<ReelsDto> reels=new ArrayList<>();
	private List<PostDto> savedPosts = new ArrayList<>();
	private List<PostDto> posts;

}
