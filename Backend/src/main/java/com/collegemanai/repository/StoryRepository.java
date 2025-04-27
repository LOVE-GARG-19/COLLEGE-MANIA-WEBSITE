package com.collegemanai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.collegemanai.model.Story;

public interface StoryRepository extends JpaRepository<Story, Integer>{

    @Query("SELECT s FROM Story s WHERE s.user.id = :userId")
    List<Story> findByUserId(@Param("userId") Integer userId);  // ✅ Rename bhi sahi convention hai

    @Query("SELECT s FROM Story s WHERE s.user.id IN :userIds ORDER BY s.timestamp DESC")
    List<Story> findStoriesByUserIds(@Param("userIds") List<Integer> userIds);

//	@Query("SELECT s FROM Story s WHERE s.userDto.id = :userId")
//    List<Story> findAllStoriesByUserId(@Param("userId") Integer userId);

}
