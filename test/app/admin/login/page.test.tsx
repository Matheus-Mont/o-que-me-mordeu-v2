import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, setupUserEvent } from "@/test/test-utils";

const pushMock = vi.fn();
const refreshMock = vi.fn();
const searchParamsGetMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, refresh: refreshMock }),
  useSearchParams: () => ({ get: searchParamsGetMock }),
}));

const { default: AdminLoginPage } = await import("@/app/admin/login/page");

beforeEach(() => {
  vi.clearAllMocks();
  searchParamsGetMock.mockReturnValue(null);
});

describe("AdminLoginPage", () => {
  it("mostra erro quando as credenciais estão erradas", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: "Email ou senha incorretos." }),
      })
    );

    const user = setupUserEvent();
    render(<AdminLoginPage />);

    await user.type(screen.getByLabelText(/^email/i), "a@b.com");
    await user.type(screen.getByLabelText(/^senha/i), "errada");
    await user.click(screen.getByRole("button", { name: "entrar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Email ou senha incorretos."
    );
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("navega pro redirectTo quando o login dá certo", async () => {
    searchParamsGetMock.mockImplementation((key: string) =>
      key === "redirectTo" ? "/admin/animais" : null
    );
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: "1", email: "a@b.com" }),
      })
    );

    const user = setupUserEvent();
    render(<AdminLoginPage />);

    await user.type(screen.getByLabelText(/^email/i), "a@b.com");
    await user.type(screen.getByLabelText(/^senha/i), "certa");
    await user.click(screen.getByRole("button", { name: "entrar" }));

    expect(pushMock).toHaveBeenCalledWith("/admin/animais");
    expect(refreshMock).toHaveBeenCalled();
  });

  it("sem redirectTo na URL, navega pra /admin", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) })
    );

    const user = setupUserEvent();
    render(<AdminLoginPage />);

    await user.type(screen.getByLabelText(/^email/i), "a@b.com");
    await user.type(screen.getByLabelText(/^senha/i), "certa");
    await user.click(screen.getByRole("button", { name: "entrar" }));

    expect(pushMock).toHaveBeenCalledWith("/admin");
  });
});
