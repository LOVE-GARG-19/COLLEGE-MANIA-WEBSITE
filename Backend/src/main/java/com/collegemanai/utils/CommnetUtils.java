package com.collegemanai.utils;

import com.collegemanai.model.Comments;
import com.collegemanai.model.Post;
import com.collegemanai.model.User;

import java.util.Objects;
import java.util.Set;

public class CommnetUtils {
    public static boolean isLikedByReqUser(Comments com, Integer id) {

        Set<User> like=com.getLikedByUsers();

        for(User user:like) {
            if(Objects.equals(user.getId(), id)) {
                return true;
            }
        }

        return false;

    }
}
