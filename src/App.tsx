import { useMemo, useState } from "react";
import Tiptap from "./Tiptap";
import { convertToEmailHtml } from "./components/utils/convertEmailToHtml";

type EditorOutput = {
  html: string;
  json: string;
};

function App() {
  // css for editor content output
  const demoContent = `<h1>Welcome to the Editor Test</h1><p>This email is designed to verify that your editor correctly renders <strong>bold</strong>, <em>italic</em>, and</p><p><strong>underlined</strong> text, along with headings, lists, and paragraphs.</p><h2>Section H2: Overview</h2><p>Below you’ll find examples of common rich text elements used in everyday <mark class="highlight">emails</mark>.</p><h3>Section H3: Bullet List</h3><ul class="bullet-list"><li><p>First bullet item with <strong>bold highlight</strong></p></li><li><p>Second bullet item with <em>italic emphasis</em></p></li><li><p>Third bullet item with an <strong><u>underlined</u></strong> word</p></li></ul><h3>Section H3: Numbered List</h3><ol class="ordered-list"><li><p>Confirm headings render correctly</p></li><li><p>Check paragraph spacing and line height</p></li><li><p>Verify list indentation and numbering</p></li></ol><h4>Section H4: Final Notes</h4><p>If everything looks good, your editor supports the essential formatting features.<br>For additional checks, try combining styles like <strong><em>bold italic</em></strong> or <strong><em>underlined italic</em></strong>.</p><p>Best,<br><strong>Your Friendly Test Bot</strong></p>`;
  const [post, setPost] = useState<EditorOutput>({
    html: demoContent,
    json: "json output",
  });

  const emailHtml = useMemo(() => convertToEmailHtml(post.html), [post]);

  const onChange = (content: EditorOutput) => {
    setPost(content);
    // console.log(content.json);
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4">
      <Tiptap content={post} onChange={onChange} />

      <hr className="my-10" />

      <div className="p-3 border rounded-md bg-white mb-10 max-w-3xl w-full mx-auto">
        <h2 className="text-2xl font-medium mb-6">Editor output in html:</h2>
        <div
          className="text-wrap"
          dangerouslySetInnerHTML={{
            __html: emailHtml || "Try editing to see output",
          }}
        />

        {/* <pre className="text-wrap">
          {post ? post : "Try editing to see output"}
        </pre> */}
      </div>
    </div>
  );
}

export default App;
