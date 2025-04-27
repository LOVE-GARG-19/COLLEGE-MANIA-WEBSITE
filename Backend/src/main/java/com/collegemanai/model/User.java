//package com.collegemanai.model;
//
//import java.util.ArrayList;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Objects;
//import java.util.Set;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import com.fasterxml.jackson.annotation.JsonProperty;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Table(name = "users")
//@AllArgsConstructor
//@NoArgsConstructor
//@Data
//public class User {
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
//	private Integer id;
//	private String username;
//	private String email;
//	private String name;
//	private String mobile;
//	private String website;
//	private String bio;
//	private String gender;
//	private String image;
//
//	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//	private String password;
//
//	@JsonManagedReference
//	@ManyToMany
//	@JoinTable(
//			name = "user_following",
//			joinColumns = @JoinColumn(name = "user_id"),
//			inverseJoinColumns = @JoinColumn(name = "following_id")
//	)
//	private Set<User> following = new HashSet<>();
//
//	@JsonBackReference
//	@JsonIgnore
//	@ManyToMany(mappedBy = "following")
//	private Set<User> follower = new HashSet<>();
//
//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//	private List<Story> stories = new ArrayList<>();
//
//	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//	@JsonIgnoreProperties("user")
//	private List<Post> posts = new ArrayList<>();
//
//	@ManyToMany
//	private Set<Post> savedPost = new HashSet<>();
//
//	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//	@JsonIgnoreProperties("user")
//	private List<Reels> reels = new ArrayList<>();
//
//	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//	@JsonIgnore // important to prevent loop
//	private List<Comments> comments = new ArrayList<>();
//
//	@Override
//	public int hashCode() {
//		return Objects.hash(email, id, username);
//	}
//
//	@Override
//	public boolean equals(Object obj) {
//		if (this == obj)
//			return true;
//		if (obj == null)
//			return false;
//		if (getClass() != obj.getClass())
//			return false;
//		User other = (User) obj;
//		return Objects.equals(email, other.email) && Objects.equals(id, other.id)
//				&& Objects.equals(username, other.username);
//	}
//}



package com.collegemanai.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String username;
	private String email;
	private String name;
	private String mobile;
	private String website;
	private String bio;
	private String gender;
	private String image;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;


	@ManyToMany
	@JoinTable(
			name = "user_following",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "following_id")
	)
	private Set<User> following = new HashSet<>();

	@JsonIgnore
	@ManyToMany(mappedBy = "following")
	private Set<User> follower = new HashSet<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Story> stories;


	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("user")
	private List<Post> posts = new ArrayList<>();

	@ManyToMany
	private Set<Post> savedPost = new HashSet<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("user")
	private List<Reels> reels = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore // important to prevent loop
	private List<Comments> comments = new ArrayList<>();

	public List<Integer> getFollowerIds() {
		List<Integer> followerIds = new ArrayList<>();
		for (User follower : follower) {
			followerIds.add(follower.getId());
		}
		return followerIds;
	}
	@Override
	public int hashCode() {
		return Objects.hash(email, id, username);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return Objects.equals(email, other.email) && Objects.equals(id, other.id)
				&& Objects.equals(username, other.username);
	}



}
