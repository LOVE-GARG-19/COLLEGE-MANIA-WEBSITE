//package com.collegemanai.model;
//
//import java.time.LocalDateTime;
//import java.util.*;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import com.fasterxml.jackson.annotation.JsonBackReference;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Table(name="posts")
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//public class Post {
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
//	private Integer id;
//	private String caption;
//
//	@Column(nullable = false)
//	private String image;
//	private String location;
//	private LocalDateTime createdAt;
//
//	@ManyToOne
//	@JoinColumn(name = "user_id")
//	@JsonBackReference  // Prevent infinite recursion on the user side
//	private User user;
//
//	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
//	@JsonIgnore // Prevent infinite recursion on comments side
//	private List<Comments> comments = new ArrayList<>();
//
//	@ManyToMany(fetch = FetchType.EAGER)
//	@JoinTable(
//			name = "post_likes",
//			joinColumns = @JoinColumn(name = "post_id"),
//			inverseJoinColumns = @JoinColumn(name = "user_id")
//	)
//	@JsonIgnoreProperties("likedByUsers")  // Prevent recursion on likes side
//	private Set<User> likedByUsers = new HashSet<>();
//
//	@Override
//	public boolean equals(Object o) {
//		if (this == o) return true;
//		if (o == null || getClass() != o.getClass()) return false;
//		Post post = (Post) o;
//		return Objects.equals(id, post.id);
//	}
//
//	@Override
//	public int hashCode() {
//		return Objects.hash(id);
//	}
//}

package com.collegemanai.model;

import java.time.LocalDateTime;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="posts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String caption;

	@Column(nullable = false)
	private String image;
	private String location;
	private LocalDateTime createdAt;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
    private List<Comments> comments = new ArrayList<>();

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "post_likes",
			joinColumns = @JoinColumn(name = "post_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private Set<User> likedByUsers = new HashSet<>();

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Post post = (Post) o;
		return Objects.equals(id, post.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

}
