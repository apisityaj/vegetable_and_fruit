"use client";
import React, { useEffect, useState } from "react";
import { User, TransformedData } from "@/app/_type/department";

const UserInterface: React.FC = () => {
  const [jsonData, setJsonData] = useState<{ users: User[] }>({ users: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        if (response.ok) {
          const data = await response.json();
          if (data && data.users) {
            setJsonData(data);
          } else {
            throw new Error("Invalid data structure");
          }
        } else {
          throw new Error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const transformData = (): TransformedData => {
    const transformedData: TransformedData = {};

    jsonData.users.forEach((user) => {
      // Check department user and format
      if (user.company && user.company.department) {
        const department = user.company.department;
        if (!transformedData[department]) {
          transformedData[department] = {
            male: 0,
            female: 0,
            ageRange: "",
            hair: {
              Black: 0,
              Blond: 0,
              Chestnut: 0,
              Brown: 0,
            },
            addressUser: {},
          };
        }

        // Male Count Summary & Female Count Summary
        if (user.gender === "male") {
          transformedData[department].male++;
        } else if (user.gender === "female") {
          transformedData[department].female++;
        }

        // Age range from lowest to highest
        const age = calculateAge(user.birthDate);
        if (
          !transformedData[department].minAge ||
          age < transformedData[department].minAge
        ) {
          transformedData[department].minAge = age;
        }
        if (
          !transformedData[department].maxAge ||
          age > transformedData[department].maxAge
        ) {
          transformedData[department].maxAge = age;
        }

        // Color Summary
        const hairColor = user.hair?.color || "Unknown";
        transformedData[department].hair[hairColor] =
          (transformedData[department].hair[hairColor] || 0) + 1;

        // FirstName LastName": postalCode
        const addressKey = `${user.firstName} ${user.lastName}`;
        transformedData[department].addressUser[addressKey] =
          user.address?.postalCode || "Unknown";
      }
    });
    // convert minAge and maxAge to age range.
    for (const department in transformedData) {
      const { minAge, maxAge } = transformedData[department];
      if (minAge !== undefined && maxAge !== undefined) {
        transformedData[department].ageRange = `${minAge}-${maxAge}`;
      }
      delete transformedData[department].minAge;
      delete transformedData[department].maxAge;
    }

    return transformedData;
  };

  // age calculation function
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const transformedData = transformData();

  return (
    <div>
      <div
        className=" text-center font-bold text-blue-600"
        onClick={() => console.log("Tranforms JSON data from API", transformedData)}
      >
        Click to view JSON data in console log
      </div>
      {Object.entries(transformedData).map(([department, data]) => {
        return (
          <div
            key={department}
            style={{
              border: "1px solid #000",
              margin: "10px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <p>{department}</p>
            <p>Male: {data.male}</p>
            <p>Female: {data.female}</p>
            <p>Age Range: {data.ageRange}</p>
            <div>
              <h3>Hair Colors:</h3>
              <ul>
                {Object.entries(data.hair).map(([color, count]) => (
                  <li className="ml-5" key={color}>
                    {`- ${color}: ${count}`}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Addresses:</h3>
              <ul>
                {Object.entries(data.addressUser).map(([name, postalCode]) => (
                  <li className="ml-5" key={name}>
                    {`- ${name}: ${postalCode}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserInterface;
