"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	const fetchTasks = async () => {
		const response = await axios.get("https://25e3-41-90-68-231.ngrok-free.app/api/tasks");
		setTasks(response.data);
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	const addTask = async () => {
		console.log(newTask);
		await axios.post("http://localhost:3001/api/addtasks", {
			task_name: newTask
		});
		setNewTask("");
		fetchTasks();
	};

	const toggleCompletion = async (id: any, completed: any) => {
		await axios.put(`http://localhost:3001/api/updatetasks/${id}`, {
			completed: !completed
		});
		fetchTasks();
	};

	const deleteTask = async (id: any) => {
		await axios.delete(`http://localhost:3001/api/deletetasks/${id}`);
		fetchTasks();
	};
	return (
		<div className="card border m-4 p-2 bg-black-600">
			<h1 className="text-center text-4xl font-bold uppercase tracking-wide text-green-500 bg-green-50">
				Todo App
			</h1>

			<div className="overflow-x-auto">
				<table className="table border w-full shadow">
					<thead>
						<tr className="bg-green-500">
							<th className="border">Id</th>
							<td className="border text-center font-bold hidden md:table-cell">
								Check
							</td>
							<th className="border">Task</th>
							<td className="border text-center font-bold">Action</td>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task: any) => (
							<tr key={task.id}>
								<td className="border text-center">{task.id}</td>
								<td className="border text-center ">
									
									<input
										className={`checkbox ${
											task.completed ? "text-green-500" : "text-blue-500"
										}`}
										type="checkbox"
										checked={task.completed}
										onChange={() => toggleCompletion(task.id, task.completed)}
									/>
								</td>
								<td className="border text-center">{task.task_name}</td>
								<td className="border text-center">
									<button
										className="button bg-red-200 rounded p-1 font-bold"
										onClick={() => deleteTask(task.id)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="mt-2">
				<input
					className="input-text text-green-950 border h-10 rounded shadow w-full"
					type="text"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<button
					className="button bg-green-500 rounded p-2 w-full mt-2"
					onClick={addTask}>
					Add Task
				</button>
			</div>
		</div>
	);
}
