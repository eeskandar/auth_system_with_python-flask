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
      users: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      setUsers: (username, email, password) => {
        const store = getStore();
        setFavorites({
          users: [
            ...store.users,
            { username: username, email: email, password: password },
          ],
        }); // need to hash the password to pass it to the db
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
