import { useNavigate, useParams } from "react-router-dom";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function ActivityDetails() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const {
    data: activity,
    loading,
    error,
  } = useQuery(`/activities/${activityId}`, "activity");

  const {
    mutate: deleteActivity,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", `/activities/${activityId}`, ["activities"]);

  const handleDelete = async () => {
    await deleteActivity();
    navigate("/activities");
  };

  if (loading || !activity) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>
        <strong>Created by</strong> {activity.creatorName}
      </p>

      {token && (
        <button onClick={handleDelete}>
          {deleting ? "Deleting..." : "Delete Activity"}
        </button>
      )}
      {deleteError && <p>{deleteError}</p>}
    </div>
  );
}
