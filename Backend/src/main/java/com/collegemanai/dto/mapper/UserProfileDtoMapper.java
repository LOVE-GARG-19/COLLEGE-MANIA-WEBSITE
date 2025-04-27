package com.collegemanai.dto.mapper;

import com.collegemanai.dto.UserProfileDto;
import com.collegemanai.model.User;

import java.util.stream.Collectors;

public class UserProfileDtoMapper {

    public static UserProfileDto toUserProfileDto(User user) {
        UserProfileDto dto = new UserProfileDto();

        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        dto.setMobile(user.getMobile());
        dto.setWebsite(user.getWebsite());
        dto.setBio(user.getBio());
        dto.setGender(user.getGender());
        dto.setImage(user.getImage());
        dto.setPosts(PostDtoMapper.toPostDtos(user.getPosts()));
        dto.setFollower(user.getFollower()
                .stream()
                .map(UserDtoMapper::toUserDto)
                .collect(Collectors.toSet()));

        dto.setFollowing(user.getFollowing()
                .stream()
                .map(UserDtoMapper::toUserDto)
                .collect(Collectors.toSet()));

        dto.setStories(user.getStories()
                .stream()
                .map(StoryDtoMapper::toStoryDto)
                .collect(Collectors.toList()));

        dto.setReels(user.getReels()
                .stream()
                .map(ReelsDtoMapper::toReelsDto)
                .collect(Collectors.toList()));

        dto.setSavedPosts(user.getSavedPost()
                .stream()
                .map(PostDtoMapper::toPostDto)
                .collect(Collectors.toList()));



        return dto;
    }
}