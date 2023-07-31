import Head from "next/head";

function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>

      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Your Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="Your Email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows="4"
                className="w-full p-2 border rounded-md"
                placeholder="Your Message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
