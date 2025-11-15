// Inject schema.org JSON-LD markup for SEO.
export default function JsonLdSchema({ data }) {
  if (!data) return null;

  const json = JSON.stringify(data, (_key, value) => {
    if (value === undefined) {
      return undefined;
    }
    return value;
  });

  const safeJson = json
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJson,
      }}
    />
  );
}
