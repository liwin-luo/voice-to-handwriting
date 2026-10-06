"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "@phosphor-icons/react";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-28 text-center">
      <p className="font-hand text-7xl text-zinc-200">404</p>
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      <p className="text-sm text-zinc-500">{t("text")}</p>
      <Link href="/" className="btn btn-primary mt-2 px-5 py-2.5">
        <ArrowLeft className="size-4" />
        {t("back")}
      </Link>
    </main>
  );
}
