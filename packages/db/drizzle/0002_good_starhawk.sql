DO $$ BEGIN
 CREATE TYPE "Colors" AS ENUM('primary', 'gray', 'mauve', 'slate', 'sage', 'olive', 'sand', 'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'bronze', 'gold', 'brown', 'orange', 'amber', 'yellow', 'lime', 'mint', 'sky');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "Priority" AS ENUM('Important', 'Medium', 'Low');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Assignment" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text,
	"orgId" text,
	"name" text NOT NULL,
	"weight" integer NOT NULL,
	"grade" integer,
	"dueDate" timestamp,
	"reminder" timestamp,
	"submissionLink" text,
	"attachments" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"moduleId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Flashcard" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text,
	"orgId" text,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"lastAttempted" timestamp,
	"lastAttemptCorrect" boolean,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"notebookId" text,
	"moduleId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Module" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text,
	"orgId" text,
	"name" text NOT NULL,
	"description" text,
	"icon" text DEFAULT 'graduation-cap',
	"color" "Colors" DEFAULT 'primary',
	"code" text NOT NULL,
	"credits" integer DEFAULT 0 NOT NULL,
	"lastVisited" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Notebook" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text,
	"orgId" text,
	"title" text NOT NULL,
	"icon" text DEFAULT 'file',
	"content" text NOT NULL,
	"moduleId" text,
	"lastEdited" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Task" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text,
	"orgId" text,
	"task" text NOT NULL,
	"description" text,
	"attachments" text,
	"priority" "Priority",
	"completed" boolean DEFAULT false,
	"dueDate" timestamp,
	"repeat" boolean DEFAULT false,
	"repeatInterval" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"moduleId" text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Module_userId_key" ON "Module" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Module_orgId_key" ON "Module" ("orgId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Module_code_key" ON "Module" ("code");