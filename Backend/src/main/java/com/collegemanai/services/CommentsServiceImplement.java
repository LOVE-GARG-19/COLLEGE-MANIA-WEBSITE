package com.collegemanai.services;

import com.collegemanai.exception.CommentException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collegemanai.exception.PostException;
import com.collegemanai.exception.UserException;
import com.collegemanai.model.Comments;
import com.collegemanai.model.Post;
import com.collegemanai.model.User;
import com.collegemanai.repository.CommentRepository;
import com.collegemanai.repository.PostRepository;

@Service
public class CommentsServiceImplement implements CommentService {
	
	@Autowired
	private CommentRepository repo;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private PostRepository postRepo;

	
	
	@Override
	public Comments createComment(Comments comment, Integer postId, Integer userId) throws PostException, UserException {
		User user = userService.findUserById(userId);
		Post post = postService.findePostById(postId);

		comment.setUser(user);
		comment.setCreatedAt(LocalDateTime.now());
		comment.setPost(post);

		// 🟢 Just save the comment, don't manually add it to post.getComments()
		return repo.save(comment);

	}


	@Override
	public Comments findCommentById(Integer commentId) throws CommentException {
		Optional<Comments> opt=repo.findById(commentId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new CommentException("comment not exist with id : "+commentId);
	}

	@Override
	public Comments likeComment(Integer commentId, Integer userId) throws UserException, CommentException {
		// TODO Auto-generated method stub
		
		User user=userService.findUserById(userId);
		Comments comment=findCommentById(commentId);
		comment.getLikedByUsers().add(user);
		System.out.println(("like ------- "+" ------ "+comment));
		return repo.save(comment);
		
	}


	@Override
	public Comments unlikeComment(Integer commentId, Integer userId) throws UserException, CommentException {
		User user=userService.findUserById(userId);
		Comments comment=findCommentById(commentId);
		
		comment.getLikedByUsers().remove(user);
		
		return repo.save(comment);
		
	}


	@Override
	public String deleteCommentById(Integer commentId) throws CommentException {
		Comments comment=findCommentById(commentId);
		
		System.out.println("find by id delete-------- "+comment.getContent());
		
		repo.deleteById(comment.getId());
		
		return "Comment Deleted Successfully";
	}


	@Override
	public String editComment(Comments comment,Integer commentId) throws CommentException {
		Comments isComment=findCommentById(commentId);
		
		if(comment.getContent()!=null) {
			isComment.setContent(comment.getContent());
		}
		repo.save(isComment);
		return "Comment Updated Successfully";
	}


	@Override
	public List<Comments> findCommentByPostId(Integer postId) throws PostException {
		List<Comments> comments =repo.findCommentsByPostId(postId);
		return comments;
	}




	
	
	
	
	

}
