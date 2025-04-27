//package com.collegemanai.model;
//
//import java.time.LocalDateTime;
//import java.util.HashSet;
//import java.util.Set;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotNull;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//public class Comments {
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
//	private Integer id;
//
//	@ManyToOne
//	@JoinColumn(name = "user_id")
//	@JsonBackReference // Prevent infinite recursion when serializing the user side
//	private User user;
//
//	@NotNull
//	private String content;
//
//	private LocalDateTime createdAt;
//
//	@ManyToMany
//	@JoinTable(
//			name = "comment_likes",
//			joinColumns = @JoinColumn(name = "comment_id"),
//			inverseJoinColumns = @JoinColumn(name = "user_id")
//	)
//	private Set<User> likedByUsers = new HashSet<>();
//
//	@ManyToOne
//	@JoinColumn(name = "post_id")
//	@JsonIgnore // Prevent infinite recursion when serializing the post side
//	private Post post;
//
//	@Override
//	public String toString() {
//		return "Comments [id=" + id + ", userId=" + (user != null ? user.getId() : null) + ", content=" + content + "]";
//	}
//}

package com.collegemanai.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comments {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;

	@NotNull
	private String content;

	private LocalDateTime createdAt;


	@ManyToMany
	@JoinTable(
			name = "comment_likes", // 🔁 Renamed for clarity
			joinColumns = @JoinColumn(name = "comment_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private Set<User> likedByUsers = new HashSet<>();

	@ManyToOne
	@JoinColumn(name = "post_id")
	@JsonIgnore
	private Post post;

	@Override
	public String toString() {
		return "Comments [id=" + id + ", userId=" + (user != null ? user.getId() : null) + ", content=" + content + "]";
	}

}
