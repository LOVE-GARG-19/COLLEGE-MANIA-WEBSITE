package com.collegemanai.dto.mapper;

import com.collegemanai.dto.CommentDto;
import com.collegemanai.dto.UserDto;
import com.collegemanai.model.Comments;
import com.collegemanai.model.User;
import com.collegemanai.utils.CommnetUtils;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class CommentDtoMapper {

	public static CommentDto toCommentDTO(Comments comment,Integer userid) {

		CommentDto dto = new CommentDto();
		dto.setId(comment.getId());
		dto.setContent(comment.getContent());
		dto.setCreatedAt(comment.getCreatedAt());
		dto.setUser(UserDtoMapper.toUserDto(comment.getUser()));
		List<UserDto> likedUsers = comment.getLikedByUsers()
				.stream()
				.map(UserDtoMapper::toUserDto)
				.collect(Collectors.toList());

		dto.setLiked(likedUsers);
        dto.setLikedByRequser(CommnetUtils.isLikedByReqUser(comment,userid));
		return dto;
	}
	public static List<CommentDto> toCommentDtos(List<Comments> comments, Integer id){
		List<CommentDto> commentDtos=new ArrayList<>();
		for(Comments comment: comments) {

			CommentDto commentDto=toCommentDTO(comment,id);
			commentDtos.add(commentDto);

		}

		return commentDtos;
	}
	public static List<CommentDto> toCommentDtos(List<Comments> comments, User user) {
		Set<Integer> seenIds = new HashSet<>();  // Track already processed comment IDs
		List<CommentDto> commentDtos = new ArrayList<>();

		for (Comments comment : comments) {
			if (!seenIds.contains(comment.getId())) {  // Check if the comment is already added
				CommentDto commentDto = toCommentDTOs(comment, user);  // Map the comment
				commentDtos.add(commentDto);  // Add unique comment
				seenIds.add(comment.getId());  // Mark this comment as processed
			}
		}

		return commentDtos;  // Return the filtered list
	}

	public static CommentDto toCommentDTOs(Comments comment, User user) {

		CommentDto dto = new CommentDto();
		dto.setId(comment.getId());
		dto.setContent(comment.getContent());
		dto.setCreatedAt(comment.getCreatedAt());
		dto.setUser(UserDtoMapper.toUserDto(comment.getUser()));
		List<UserDto> likedUsers = comment.getLikedByUsers()
				.stream()
				.map(UserDtoMapper::toUserDto)
				.collect(Collectors.toList());

		dto.setLiked(likedUsers);
		dto.setLikedByRequser(CommnetUtils.isLikedByReqUser(comment,user.getId()));

		return dto;
	}

}
