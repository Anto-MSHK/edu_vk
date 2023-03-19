import {
  Avatar,
  Button,
  Cell,
  Gradient,
  Group,
  Header,
  Panel,
  PanelHeader,
  PanelHeaderClose,
  Spinner,
  Title,
} from "@vkontakte/vkui";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ExistUser } from "../components/ExistUser";
import { NotExistUser } from "../components/NotExistUser";
import { SkeletonAvatar, SkeletonText } from "../components/Skeleton";
import { GlobalContext } from "../context";
import { getUser } from "./../store/hhtp";

const SignIn = ({ id, fetchedUser }) => {
  const [isPhoneExist, setIsPhoneExist] = useState(null);
  useEffect(() => {
    console.log("fetchedUser");
    console.log(fetchedUser);
    if (fetchedUser !== null)
      if (!fetchedUser.phone_number) setIsPhoneExist(false);
      else {
        getUser().then((res) => {
          res.map((user) => {
            if (user.phone === fetchedUser.phone_number) {
              console.log(user.phone + " " + fetchedUser.phone_number);
              setIsPhoneExist(true);
            }
            return;
          });
        });
      }
  }, [fetchedUser]);
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderClose />}>EDU.vk</PanelHeader>
      {isPhoneExist === null ? (
        <Spinner size="large" style={{ margin: "20px 0" }} />
      ) : isPhoneExist ? (
        <ExistUser fetchedUser={fetchedUser} />
      ) : (
        <NotExistUser fetchedUser={fetchedUser} />
      )}
    </Panel>
  );
};

export default SignIn;
