package com.collegemanai.dto.mapper;

import com.collegemanai.dto.CommentDto;
import com.collegemanai.dto.PostDto;
import com.collegemanai.dto.UserDto;
import com.collegemanai.model.Post;
import com.collegemanai.model.User;
import com.collegemanai.utils.PostUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
@Component
public class PostDtoMapper {
	
	public static PostDto toPostDto(Post post,User user) {

		UserDto userDto = UserDtoMapper.toUserDto(post.getUser());
		List<User> likedUsers=new ArrayList<>(post.getLikedByUsers());
		List<UserDto> userDtos=UserDtoMapper.userDTOS(likedUsers);
//		List<CommentDto> comments=CommentDtoMapper.toCommentDtos(post.getComments(),user);
		List<CommentDto> comments = CommentDtoMapper.toCommentDtos(post.getComments(), user);
		System.out.println("mapping of comments"+comments);
		PostDto postDto=new PostDto();
		postDto.setCaption(post.getCaption());
		postDto.setCreatedAt(post.getCreatedAt());
		postDto.setId(post.getId());
		postDto.setImage(post.getImage());
		postDto.setLocation(post.getLocation()); // ✅ THIS LINE IS NEEDED!
		postDto.setUser(userDto);
		postDto.setLiked(userDtos);
		postDto.setComments(comments);
		postDto.setLikedByRequser(PostUtils.isLikedByReqUser(post, user));
		postDto.setSavedByRequser(PostUtils.isSaved(post, user));
		postDto.setTotalLikes(likedUsers.size());
		return postDto;
		
	}
	
	public static List<PostDto> toPostDtos(List<Post> posts, User user){

		return posts.stream()
				.map(post -> toPostDto(post, user))
				.collect(Collectors.toList());
	}
	public static List<PostDto> toPostDtos(List<Post> posts) {
		return posts.stream()
				.map(PostDtoMapper::toPostDto)
				.collect(Collectors.toList());
	}


	public static PostDto toPostDto(Post post) {
		PostDto dto = new PostDto();
		// i added
		List<CommentDto> comments = CommentDtoMapper.toCommentDtos(post.getComments(),post.getUser());
		List<User> likedUsers=new ArrayList<>(post.getLikedByUsers());
		List<UserDto> userDtos=UserDtoMapper.userDTOS(likedUsers);
		dto.setId(post.getId());
		dto.setComments(comments);
		dto.setCaption(post.getCaption());
		dto.setImage(post.getImage());
		dto.setCreatedAt(post.getCreatedAt());
		dto.setLocation(post.getLocation());
		dto.setLiked(userDtos);
		// Assuming your PostDto has a UserDto field for the post owner:
		dto.setUser(UserDtoMapper.toUserDto(post.getUser()));

		return dto;
	}

}
