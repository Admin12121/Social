import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Navbar from "../main/_components/Navbar";


export default function Docs() {
  return (
    <>
    <Navbar/>
        <div className={cn("container mx-auto py-10 px-4 space-y-8 lg:px-16")}>
        <section className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Frontend Officer Assignment Docs
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn about the technologies and tools used to build this project and why they were chosen.
            </p>
        </section>
        <Card className="shadow-lg">
            <CardHeader>
            <CardTitle className="text-2xl font-semibold">Starter Package CLI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <p>
                I used my own npm package, <a href="https://www.npmjs.com/package/starter-package-cli" target="_blank" className="underline font-semibold">starter-package-cli</a>, which is built on top of <strong>Shadcn UI</strong>, <strong>Tailwind CSS</strong>, and my custom components.
            </p>
            <p>
                <strong>Why I chose it:</strong> This package includes my customizations and reusable components, which streamline the development process and ensure optimized websites every time. It helps me rapidly scaffold projects without redoing basic setup, providing a personalized and efficient development workflow.
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto">
                npm install starter-package-cli
            </pre>
            </CardContent>
        </Card>
        <Card className="shadow-lg">
            <CardHeader>
            <CardTitle className="text-2xl font-semibold">Shadcn UI & Tailwind CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <p>
                Shadcn UI and Tailwind CSS are the backbone of the frontend design. I use them for their modern design principles and utility-first approach to styling.
            </p>
            <p>
                <strong>Why I chose it:</strong> These tools ensure a consistent design system, complete control over styling, and help with rapid prototyping. Tailwind’s responsive utilities make the app highly customizable and mobile-friendly.
            </p>
            </CardContent>
        </Card>
        <Card className="shadow-lg">
            <CardHeader>
            <CardTitle className="text-2xl font-semibold">Supabase</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <p>
                <strong>What it is:</strong> Supabase is an open-source backend-as-a-service platform providing database, authentication, and real-time updates.
            </p>
            <p>
                <strong>Why I chose it:</strong> Supabase simplifies OAuth integration for Google and GitHub, making it easy to manage user authentication. It also provides real-time database updates, keeping posts and user interactions in sync.
            </p>
            </CardContent>
        </Card>
        <Card className="shadow-lg">
            <CardHeader>
            <CardTitle className="text-2xl font-semibold">React.js</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <p>
                React.js is used to build the frontend of the app due to its component-based architecture and excellent performance. It makes managing the app's state and rendering UI elements efficient.
            </p>
            <p>
                <strong>Why I chose it:</strong> React's reusable components, virtual DOM, and one-way data flow make it a powerful tool for building user-friendly and dynamic web applications.
            </p>
            </CardContent>
        </Card>
        <Card className="shadow-lg">
            <CardHeader>
            <CardTitle className="text-2xl font-semibold">Deployment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <p>
                The project is deployed using <strong>Vercel</strong>, which offers seamless integration with GitHub. This allows for automatic deployments on every push to the main branch, ensuring that the latest changes are always live.
            </p>
            <p>
                <strong>Why I chose it:</strong> Vercel provides a hassle-free deployment process with features like automatic SSL, custom domains, and serverless functions. Its ability to handle deployments automatically on git push reduces manual intervention and speeds up the development workflow.
            </p>
            </CardContent>
        </Card>
        <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Key Features</h2>
            <div className="space-y-4">
            <Badge className="px-3 py-2">OAuth Login</Badge>
            <p>Users can log in using Google or GitHub, implemented with Supabase’s OAuth capabilities.</p>

            <Badge className="px-3 py-2">Post Viewing & Interactions</Badge>
            <p>Users can view posts, like them, and repost them. Each post contains a title, content, optional image, and counters for likes and reposts.</p>

            <Badge className="px-3 py-2">Post Creation</Badge>
            <p>Users can create new posts with HTML content, and optional images, stored securely in Supabase.</p>
            </div>
        </section>
        </div>
    </>
  );
}
