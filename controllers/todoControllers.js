import todo from "../models/todomodal.js";
const todohome = (req, res) => {
  res.send("this is todo home Page");
};
const todoregister = async (req, res) => {
  try {
    const owner = req.body.user.id;
    console.log(owner);
    const { title, description } = req.body;
    // console.log(owner);

    if (!owner || !title || !description) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const addtask = await todo.create({
      owner,
      // task: {
      title,
      description,
      // },
    });
    // user.save();
    // console.log(addtask);

    if (!addtask) {
      res.status(400).json({
        msg: "Some Thing went Wrong! plse try again for added New Todo ",
      });
    }

    res.status(201).json({
      success: true,
      message: "New Todo added",
      addtask,
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      // message: "Note add New Todo ",
    });
  }
};
const AddNewTask = async (req, res) => {
  try {
    const owner = req.user.id;
    const { title, description } = req.body;
    // const { id, title, link } = req.body;
    // console.log(req.user.id);
    // console.log(owner);
    // const owners = await todo.findOne({owner});
    // console.log(owners);

    const New_task = {
      title,
      description,
    };

    const test = await todo.updateOne(
      // { _id: id },
      { owner: owner },
      { $push: { task: New_task } }
    );
    // console.log(test);

    res.status(200).json({
      success: true,
      message: "new task added ",
      data: test,
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

export { todohome, todoregister, AddNewTask };
