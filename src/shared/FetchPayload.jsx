// Note: "POST" does not need "id"

// Note: "PATCH" does need "id"

/* ============================================= */
function FetchPayload(title, isCompleted, id) {
  if (!id) {
    return {
      records: [
        {
          fields: {
            title: title,
            isCompleted: isCompleted,
          },
        },
      ],
    };
  }

  return {
    records: [
      {
        id: id,
        fields: {
          title: title,
          isCompleted: isCompleted,
        },
      },
    ],
  };
}

/* ============================================= */
export default FetchPayload;
