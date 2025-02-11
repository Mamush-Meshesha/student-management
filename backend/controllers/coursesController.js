import prisma from "../utils/prisma.js";

export const createCourse = async (req, res) => {
    const { name, code, departmentId, studentId } = req.body
    
    try {
        const course = await prisma.course.create({
            data: {
                name,
                code,
                departmentId,
                studentId
            }
        })

        res.status(201).json(course)
    } catch (error) {
        res.status(500).json({ message: "Error creating course" })
    }

}

export const getAllCourse = async (req, res) => {
    try {
        const courses = await prisma.course.findMany({
            include: {
                department: true,
                // student: true
            }
        })
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses" })
        console.log(error.message)
    }
}

export const getCourse = async (req, res) => {
    const { id } = req.params  
    try {
        const course = await prisma.course.findUnique({
            where: { id },
            include: {
                department: true,
                student: true
            }
        })
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json({ message: "Error fetching course" })
    }
}

export const updateCourse = async (req, res) => {
    const { id } = req.params
    const { name, code, departmentId, studentId } = req.body

    try {
        const updatedCourse = await prisma.course.update({
            where: { id },
            data: {
                name,
                code,
                departmentId,
                studentId
            }
        })

        res.status(200).json(updatedCourse)
    } catch (error) {
        res.status(500).json({ message: "Error updating course" })
    }
}

export const deleteCourse = async (req, res) => {
    const { id } = req.params

    try {
        await prisma.course.delete({
            where: { id }
        })

        res.status(200).json({ message: "Course deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting course" })
    }
}