package com.collegemanai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.collegemanai.dto.CommentDto;
import com.collegemanai.dto.mapper.CommentDtoMapper;
import com.collegemanai.exception.CommentException;
import com.collegemanai.exception.PostException;
import com.collegemanai.exception.UserException;
import com.collegemanai.model.Comments;
import com.collegemanai.model.User;
import com.collegemanai.response.MessageResponse;
import com.collegemanai.services.CommentService;
import com.collegemanai.services.UserService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

	@Autowired
	private CommentService commentService;

	@Autowired
	private UserService userService;

	@PostMapping("/create/{postId}")
	public ResponseEntity<CommentDto> createCommentHandler(
			@RequestBody Comments comment,
			@PathVariable("postId") Integer postId,
			@RequestHeader("Authorization") String token
	) throws PostException, UserException {

		User user = userService.findUserProfile(token);
		Comments createdComment = commentService.createComment(comment, postId, user.getId());
		CommentDto dto = CommentDtoMapper.toCommentDTO(createdComment, user.getId());

		return new ResponseEntity<>(dto, HttpStatus.CREATED);
	}


	@PutMapping("/like/{commentId}")
	public ResponseEntity<CommentDto> likeCommentHandler(
			@PathVariable Integer commentId,
			@RequestHeader("Authorization") String token
	) throws UserException, CommentException {

		User user = userService.findUserProfile(token);
		Comments likedComment = commentService.likeComment(commentId, user.getId());
		CommentDto dto = CommentDtoMapper.toCommentDTO(likedComment, user.getId());
		System.out.println("response of like comment"+dto);
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}


	@PutMapping("/unlike/{commentId}")
	public ResponseEntity<CommentDto> unlikeCommentHandler(
			@RequestHeader("Authorization") String token,
			@PathVariable Integer commentId
	) throws UserException, CommentException {
		User user = userService.findUserProfile(token);
		Comments unlikedComment = commentService.unlikeComment(commentId, user.getId());
		CommentDto dto = CommentDtoMapper.toCommentDTO(unlikedComment, user.getId());

		return new ResponseEntity<>(dto, HttpStatus.OK);
	}


	@PutMapping("/edit")
	public ResponseEntity<MessageResponse> editCommentHandler(@RequestBody Comments comment) throws CommentException {

		commentService.editComment(comment, comment.getId());

		MessageResponse res = new MessageResponse("Comment Updated Successfully");
		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	}


	@DeleteMapping("/delete/{commentId}")
	public ResponseEntity<MessageResponse> deleteCommentHandler(@PathVariable Integer commentId) throws CommentException {

		commentService.deleteCommentById(commentId);

		MessageResponse res = new MessageResponse("Comment Deleted Successfully");
		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	}


	@GetMapping("/post/{postId}")
	public ResponseEntity<List<CommentDto>> getCommentHandler(@PathVariable Integer postId) throws CommentException, PostException, UserException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		User user = userService.findUserByEmail(email);
		List<Comments> comments = commentService.findCommentByPostId(postId);
		List<CommentDto> commentDtos = CommentDtoMapper.toCommentDtos(comments,user.getId());

		return new ResponseEntity<>(commentDtos, HttpStatus.OK);
	}
}
