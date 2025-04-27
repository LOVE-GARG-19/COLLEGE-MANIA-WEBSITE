package com.collegemanai.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {

	private Integer id;
	private String username;
	private String name;
	private String userImage;
	private String email;




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
		UserDto other = (UserDto) obj;
		return Objects.equals(email, other.email) && Objects.equals(id, other.id)
				&& Objects.equals(username, other.username);
	}



	@Override
	public String toString() {
		return "UserDto [username=" + username + ", email=" + email + ", id=" + id + "]";
	}
}
