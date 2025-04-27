package com.collegemanai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.collegemanai.model.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {
    @EntityGraph(attributePaths = {"likedByUsers", "user", "comments"})
    @Query("select p from Post p where p.user.id=?1")
     List<Post> findByUserId(Integer userId);

    @EntityGraph(attributePaths = {"likedByUsers", "user", "comments"})
    @Query("SELECT p FROM Post p WHERE p.user.id IN :users ORDER BY p.createdAt DESC")
     List<Post> findAllPostByUserIds(@Param("users") List<Integer> userIds);

    @EntityGraph(attributePaths = {"likedByUsers", "user", "comments"})
    @Query("SELECT p FROM Post p WHERE p.user.id IN :users ORDER BY p.createdAt DESC")
     List<Post> findAllPostByUserIdsSortedByDateDesc(@Param("users") List<Integer> userIds);

    @EntityGraph(attributePaths = {"likedByUsers", "user", "comments"})
    @Query("SELECT p FROM Post p ORDER BY p.createdAt DESC")
    List<Post> findAllWithLikesAndComments();


}
