import { MdConnectWithoutContact } from "react-icons/md";
import ProfileInfoComponent from "./components/profile-info";
import NewDM from "./components/new-dm";
import { useEffect } from "react";
import apiClient from "@/lib/api-frontend";
import {
  GET_DM_CONTACTS_ROUTES,
  GET_USER_CHANNEL_ROUTES,
} from "@/utils/constants";
import useAppStore from "@/store";
import ContactList from "@/components/ui/contact-list";
import CreateChannel from "./components/create-channel";

const ContactContainer = () => {
  const {
    directMessageContacts,
    setDirectMessageContacts,
    channels,
    setChannels,
  } = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
        withCredentials: true,
      });
      if (response.data.contacts) {
        setDirectMessageContacts(response.data.contacts);
      }
    };
    const getChannels = async () => {
      const response = await apiClient.get(GET_USER_CHANNEL_ROUTES, {
        withCredentials: true,
      });
      if (response.data.channels) {
        setChannels(response.data.channels);
      }
    };
    getChannels();
    getContacts();
  }, []);

  return (
    <div className="relative h-[100vh] md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div>
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessageContacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Groups" />
          <CreateChannel />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={channels} isChannel={true} />
        </div>
      </div>
      <ProfileInfoComponent />
    </div>
  );
};

export default ContactContainer;

const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <span className="text-4xl text-purple-500">
        <MdConnectWithoutContact />
      </span>
      <div>
        <h2 className="font-bold text-2xl">Connect</h2>
        <p className="text-[8px] text-center">Designed by <span className="text-purple-500">Rohit</span></p>
      </div>
      
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
