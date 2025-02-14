import prisma from "../utils/prisma.js";

export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const existingDepartment = await prisma.department.findUnique({
      where: { name },
    });
    if (existingDepartment) {
      return res.status(400).json({ error: "Department already exists" });
    }

    const department = await prisma.department.create({
      data: {
        name,
      },
    });

    res.status(201).json(department);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedDepartment = await prisma.department.update({
      where: { id },
      data: {
        name,
      },
    });

    res.status(200).json(updatedDepartment);
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.department.delete({
      where: { id },
    });

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

