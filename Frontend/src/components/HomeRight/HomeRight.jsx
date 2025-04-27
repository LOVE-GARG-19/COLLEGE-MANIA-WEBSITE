import React, { useEffect, useState } from "react";
import PopularUserCard from "./PopularUserCard";
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import SearchUser from "../SearchUser/SearchUser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getPopularUsers} from '../../Redux/Auth/auth.action'
// const popularUser = [1, 1, 1, 1];
const HomeRight = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const {auth} = useSelector(store=>store);
  useEffect(()=>{
    dispatch(getPopularUsers());
  },[dispatch])
  const handleUserClick=(userId)=>{
    navigate(`/profile/${userId}`)
  }
  return (
    <div className="pr-5">
      <SearchUser handleClick={handleUserClick}/>
      <div className="card p-5">
        
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          {/* <p className="text-xs font-semibold opacity-95">View All</p> */}
        </div>

        <div className="space-y-5">
          {auth?.users?.map((item, index) => (
            <PopularUserCard
              key={index}
              id={item.id}
              image={
                item.userImage ||"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              }
              handleclick={handleUserClick}
              username={item?.username}
              description={"You Might Know"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
