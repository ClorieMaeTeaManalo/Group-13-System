
import React, { useEffect, useState } from "react";
import "./CustomerProfile.css";

function CustomerProfile({ customer, onBack }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact_number: ""
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // Retrieve customer profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/customers/profile",
          {
            headers: {
              Authorization: `Bearer ${customer.token}`
            }
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        setProfile(result.customer);

      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [customer.token]);

  // Update customer profile
  const handleUpdateProfile = async () => {
    try {
      setSaving(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:3000/api/customers/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${customer.token}`
          },
          body: JSON.stringify({
            name: profile.name,
            contact_number: profile.contact_number
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setProfile(result.customer);
      setMessage("Profile updated successfully!");

    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <main className="customer-profile">
      <h1>My Profile</h1>

      {message && (
        <p
          style={{
            color: message === "Profile updated successfully!" ? "green" : "red",
            marginTop: "15px",
            marginBottom: "15px",
            fontWeight: "bold"
          }}
        >
          {message}
        </p>
      )}

      <div>
        <label>Name:</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) =>
            setProfile({
              ...profile,
              name: e.target.value
            })
          }
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={profile.email}
          readOnly
        />
      </div>

      <div>
        <label>Contact Number:</label>
        <input
          type="text"
          value={profile.contact_number}
          onChange={(e) =>
            setProfile({
              ...profile,
              contact_number: e.target.value
            })
          }
        />
      </div>

      <button onClick={handleUpdateProfile} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>

      <button onClick={onBack}>
        Back to Dashboard
      </button>
    </main>
  );
}

export default CustomerProfile;
