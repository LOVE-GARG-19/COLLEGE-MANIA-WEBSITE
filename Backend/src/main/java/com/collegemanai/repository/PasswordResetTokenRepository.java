package com.collegemanai.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.collegemanai.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {

	PasswordResetToken findByToken(String token);

}
