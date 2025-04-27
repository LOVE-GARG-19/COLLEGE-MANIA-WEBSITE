package com.collegemanai.utils;


import java.util.Objects;
import java.util.Set;

import com.collegemanai.model.Post;
import com.collegemanai.model.User;

public class PostUtils {

	public static boolean isLikedByReqUser(Post post, User reqUser) {

		Set<User> like=post.getLikedByUsers();

		for(User user:like) {
			if(Objects.equals(user.getId(), reqUser.getId())) {
				return true;
			}
		}

		return false;

	}

	public static boolean isSaved(Post post,User user) {

		Set<Post> reqUsersPost=user.getSavedPost();

		for(Post item : reqUsersPost) {
			if(Objects.equals(item.getId(), post.getId())) {
				return true;
			}
		}

		return false;
	}

}
