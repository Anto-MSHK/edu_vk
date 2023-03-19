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
  const [idUserDB, setIdUserDB] = useState(null);
  useEffect(() => {
    if (fetchedUser !== null) {
      console.log(fetchedUser);
      if (
        fetchedUser.phone_number === undefined ||
        fetchedUser.phone_number === null
      ) {
        console.log("why");
        setIsPhoneExist(false);
      } else {
        getUser().then((res) => {
          res.map((user) => {
            if (
              user.phone.substring(1) === fetchedUser.phone_number.substring(1)
            ) {
              console.log(user.phone + " " + fetchedUser.phone_number);
              setIsPhoneExist(true);
              setIdUserDB(user.id);
              return;
            }
				setIsPhoneExist((prev) => {
					if (prev === null) return false;
					else return prev;
				 });
            // if (isPhoneExist === null) setIsPhoneExist(false);
          });
        });
      }
    }
  }, [fetchedUser]);
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderClose />}>EDU.vk</PanelHeader>
      {isPhoneExist === null ? (
        <Spinner size="large" style={{ margin: "20px 0" }} />
      ) : isPhoneExist ? (
        <ExistUser fetchedUser={fetchedUser} userId={idUserDB} />
      ) : (
        <NotExistUser fetchedUser={fetchedUser} userId={idUserDB} />
      )}
    </Panel>
  );
};

export default SignIn;
