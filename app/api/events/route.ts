import connectDB from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Event from "@/app/database/event.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const event = await req.json(); // ✅ FIX

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      { message: "Event Created Successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
