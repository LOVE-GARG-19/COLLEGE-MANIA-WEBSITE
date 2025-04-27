package com.collegemanai.services;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collegemanai.exception.PostException;
import com.collegemanai.exception.UserException;
import com.collegemanai.model.Post;
import com.collegemanai.model.User;
import com.collegemanai.repository.PostRepository;
import com.collegemanai.repository.UserRepository;


@Service
public class PostServiceImplementation implements PostService {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PostRepository postRepo;
	
	@Autowired
	private UserRepository userRepo;
	


	
	
	@Override
	public Post createPost(Post post, Integer userId) throws UserException   {

		User user = userService.findUserById(userId);

		post.setUser(user); // ✅ directly setting the User entity

		post.setCreatedAt(LocalDateTime.now());

        return postRepo.save(post);

	}

	
	@Override
	public List<Post> findPostByUserId(Integer userId) throws UserException {

        return postRepo.findByUserId(userId);
	}


	@Override
	public Post findePostById(Integer postId) throws PostException {
		Optional<Post> opt = postRepo.findById(postId);
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new PostException("Post not exist with id: "+postId);
	}


public List<Post> findAllPost() {
	return postRepo.findAllWithLikesAndComments(); // ✅ eager fetch with likedByUsers, user, comments
}


	@Override
	public Post likePost(Integer postId, Integer userId) throws UserException, PostException  {
		// TODO Auto-generated method stub
		
		User user= userService.findUserById(userId);
		Post post=findePostById(postId);
		post.getLikedByUsers().add(user);
	
	
		return postRepo.save(post);
		
		
	}

	@Override
	public Post unLikePost(Integer postId, Integer userId) throws UserException, PostException  {
		// TODO Auto-generated method stub
		
		User user= userService.findUserById(userId);
		Post post=findePostById(postId);
		post.getLikedByUsers().remove(user); // ✅

	
		
		return postRepo.save(post);
	}


	@Override
	public String deletePost(Integer postId, Integer userId) throws UserException, PostException {
		// TODO Auto-generated method stub
		
		Post post =findePostById(postId);
		
		User user=userService.findUserById(userId);
		System.out.println(post.getUser().getId()+" ------ "+user.getId());
		if(post.getUser().getId().equals(user.getId())) {
			System.out.println("inside delete");
			postRepo.deleteById(postId);
		
		return "Post Deleted Successfully";
		}
		
		
		throw new PostException("You Dont have access to delete this post");
		
	}


	@Override
	public List<Post> findAllPostByUserIds(List<Integer> userIds) throws PostException, UserException {
		
		
		List<Post> posts= postRepo.findAllPostByUserIds(userIds);
		
		if(posts.size()==0) {
			throw new PostException("No Post Available of your followings");
		}
		
		
		return posts;
	}


	@Override
	public Post savedPost(Integer postId, Integer userId) throws PostException, UserException {

		Post post = findePostById(postId);
		User user=userService.findUserById(userId);
		if(!user.getSavedPost().contains(post)) {
			user.getSavedPost().add(post);
			 userRepo.save(user);

		}
		return postRepo.save(post);
	}


	@Override
	public Post unSavePost(Integer postId, Integer userId) throws PostException, UserException {
		Post post=findePostById(postId);
		User user=userService.findUserById(userId);
		
		if(user.getSavedPost().contains(post)) {
			user.getSavedPost().remove(post);
			userRepo.save(user);
		}

		return postRepo.save(post);
	}


	@Override
	public Post editPost(Post post, Integer userId) throws PostException {
		Post isPost=findePostById(post.getId());
		
		if(post.getCaption()!=null) {
			isPost.setCaption(post.getCaption());
		}
		if(post.getLocation()!=null) {
			isPost.setLocation(post.getLocation());
		}
		
		return postRepo.save(isPost);
	}
	

}
