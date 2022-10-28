const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      //////////////////////////////////////////////////////////////////////////////
      activeUser: [{ id: "Guest" }],
    },
    actions: {
      setActiveUser: (user) => {
        setStore({
          activeUser: [user],
        });
      },

      createUser: async (username, email, password) => {
        try {
          let newUser;
          newUser = { username: username, email: email, password: password };
          const response = await fetch(
            process.env.BACKEND_URL + "/api/sign-up",
            {
              method: "POST",
              body: JSON.stringify(newUser),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            new Error("Ocurrió un error en la solicitud");
          }
          const body = await response.json();
          if (body.msg == "Invalid email") {
            return "0";
          } else if (body.msg == "Username already taken") {
            return "1";
          } else {
            return "2";
          }
        } catch (error) {}
      },

      login: async (email, password) => {
        try {
          let user;
          user = { email: email, password: password };
          const response = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            new Error("Ocurrió un error en la solicitud");
          }
          const body = await response.json();
          if (body.token == undefined) {
            return false;
          } else {
            getActions().setActiveUser(body);
            localStorage.setItem("token", body.token);
            return true;
          }
        } catch (error) {}
      },
      getUser: async (userid) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/api/user/${userid}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            new Error("Ocurrió un error en la solicitud");
          }
          const body = await response.json();
          getActions().setActiveUser(body);
        } catch (error) {}
      },
      logout: () => {
        localStorage.removeItem("token");
        getActions().setActiveUser({ id: "Guest" });
      },
      ///////////////////////////////////////////////////////////////////////////////
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
