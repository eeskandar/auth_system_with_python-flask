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
          getActions().setActiveUser(body);
          console.log(activeUser);
          if (body.token == undefined) {
            alert("Email or password Invalid");
          } else {
            localStorage.setItem("token", body.token);
          }
        } catch (error) {}
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
