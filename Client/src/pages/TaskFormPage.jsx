import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import toast, {Toaster}from "react-hot-toast";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id,data)
      toast.success('Tarea Actualizada')
    } else {
      await createTask(data);
      toast.success('Tarea creada')
    }
    navigate("/tasks");
  });
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const {data} = await getTask(params.id);
        
        setValue('title',data.title)
       setValue('description',data.description)
      }
    }
    loadTask();
  }, [params.id, setValue]);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          {...register("title", { required: true })}
          className="bg-zing-700 p-3 roundeg-lg block w-full mb-3"
        />
        {errors.title && <span>title field is required</span>}

        <textarea
          rows="3"
          placeholder="description"
          {...register("description", { required: true })}
           className="bg-zing-700 p-3 roundeg-lg block w-full mb-3"
        ></textarea>
        {errors.description && <span>description field is required</span>}

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
      </form>
      {params.id && (
        <div className="flex justify-end">
        <button
          className="bd-red-500 p-3 rounded-lg w48 mt-3 "
          onClick={async () => {
            const accepted = window.confirm("are you sure?");
            if (accepted) {
              await deleteTask(params.id);
              toast.success('Tarea Eliminada')
              navigate("/tasks");
            }
          }}
        >
          {" "}
          Delete
        </button>
        </div>
      )}
    </div>
  );
}
