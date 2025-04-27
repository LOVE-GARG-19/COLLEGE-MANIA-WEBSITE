package com.collegemanai.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.collegemanai.dto.PostDto;
import com.collegemanai.dto.mapper.PostDtoMapper;
import com.collegemanai.exception.PostException;
import com.collegemanai.exception.UserException;
import com.collegemanai.model.Post;
import com.collegemanai.model.User;
import com.collegemanai.response.MessageResponse;
import com.collegemanai.services.PostService;
import com.collegemanai.services.UserService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

	private final PostService postService;
	private final UserService userService;

	public PostController(PostService postService, UserService userService) {
		this.postService = postService;
		this.userService = userService;
	}

	@PostMapping("/create")
	public ResponseEntity<PostDto> createPostHandler(@RequestBody Post post, @RequestHeader("Authorization") String token) throws UserException {
		User user = userService.findUserProfile(token);
		Post createdPost = postService.createPost(post, user.getId());
		return new ResponseEntity<>(PostDtoMapper.toPostDto(createdPost, user), HttpStatus.CREATED);
	}

	@GetMapping("/all/{userId}")
	public ResponseEntity<List<PostDto>> findPostByUserIdHandler(@PathVariable("userId") Integer userId, @RequestHeader("Authorization") String token) throws UserException {
		User reqUser = userService.findUserProfile(token);
		List<Post> posts = postService.findPostByUserId(userId);
		List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, reqUser);
		return new ResponseEntity<>(postDtos, HttpStatus.OK);
	}

	@GetMapping("/following/{userIds}")
	public ResponseEntity<List<PostDto>> findAllPostByUserIds(@PathVariable("userIds") List<Integer> userIds, @RequestHeader("Authorization") String token) throws PostException, UserException {
		User reqUser = userService.findUserProfile(token);
		List<Post> posts = postService.findAllPostByUserIds(userIds);
		List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, reqUser);
		return new ResponseEntity<>(postDtos, HttpStatus.OK);
	}

	@GetMapping("/all")
	public ResponseEntity<List<PostDto>> findAllPostHandler(@RequestHeader("Authorization") String token) throws PostException, UserException {
		User reqUser = userService.findUserProfile(token);
		List<Post> posts = postService.findAllPost();
		List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, reqUser);
		return new ResponseEntity<>(postDtos, HttpStatus.OK);
	}

	@GetMapping("/{postId}")
	public ResponseEntity<PostDto> findPostByIdHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String token) throws PostException, UserException {
		User reqUser = userService.findUserProfile(token);
		Post post = postService.findePostById(postId);
		return new ResponseEntity<>(PostDtoMapper.toPostDto(post, reqUser), HttpStatus.OK);
	}

	@PutMapping("/like/{postId}")
	public ResponseEntity<PostDto> likePostHandler(@PathVariable("postId") Integer postId, @RequestHeader("Authorization") String token) throws UserException, PostException {
		System.out.println("like request comming");
		User user = userService.findUserProfile(token);

		Post updatedPost = postService.likePost(postId, user.getId());
		return new ResponseEntity<>(PostDtoMapper.toPostDto(updatedPost, user), HttpStatus.OK);
	}

	@PutMapping("/unlike/{postId}")
	public ResponseEntity<PostDto> unLikePostHandler(@PathVariable("postId") Integer postId, @RequestHeader("Authorization") String token) throws UserException, PostException {
		User user = userService.findUserProfile(token);
		Post updatedPost = postService.unLikePost(postId, user.getId());
		return new ResponseEntity<>(PostDtoMapper.toPostDto(updatedPost, user), HttpStatus.OK);
	}

	@DeleteMapping("/delete/{postId}")
	public ResponseEntity<MessageResponse> deletePostHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String token) throws UserException, PostException {
		User user = userService.findUserProfile(token);
		String message = postService.deletePost(postId, user.getId());
		return new ResponseEntity<>(new MessageResponse(message), HttpStatus.OK);
	}

	@PutMapping("/save_post/{postId}")
	public ResponseEntity<PostDto> savedPostHandler(@RequestHeader("Authorization") String token, @PathVariable Integer postId) throws UserException, PostException {
		User user = userService.findUserProfile(token);
		Post updatedpost = postService.savedPost(postId, user.getId());
		return new ResponseEntity<>(PostDtoMapper.toPostDto(updatedpost, user), HttpStatus.OK);
	}

	@PutMapping("/unsave_post/{postId}")
	public ResponseEntity<PostDto> unSavedPostHandler(@RequestHeader("Authorization") String token, @PathVariable Integer postId) throws UserException, PostException {
		User user = userService.findUserProfile(token);
		Post updatedpost = postService.unSavePost(postId, user.getId());
		return new ResponseEntity<>(PostDtoMapper.toPostDto(updatedpost, user), HttpStatus.OK);
	}

	@PutMapping("/edit")
	public ResponseEntity<MessageResponse> editPostHandler(@RequestBody Post post) throws PostException {
		postService.editPost(post, null);
		return new ResponseEntity<>(new MessageResponse("Post Updated Successfully"), HttpStatus.OK);
	}
}
