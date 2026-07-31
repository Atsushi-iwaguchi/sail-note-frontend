import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useState } from "react";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  boat_class: string;
};

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit } = useForm<RegisterFormData>();

  const [errors, setErrors] = useState<string[]>([]);

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    //再ログインしたときに前回のエラーをリセット
    setErrors([]);

    try {
      const response = await api.post("/auth/register", {
        user: data,
      });
      login(response.data.user, response.data.token);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(
          error.response?.data.error ? [error.response.data.error] : [],
        );
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>新規登録</CardTitle>
          <CardDescription>
            メールアドレスとパスワードを入力してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">ユーザー名</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="山田太郎"
                  {...register("username")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">パスワード</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="*******"
                  {...register("password")}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password_confirmation">
                    パスワード確認
                  </FieldLabel>
                </div>
                <Input
                  id="password_confirmation"
                  type="password"
                  placeholder="*******"
                  {...register("password_confirmation")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="boat_class">艇種</FieldLabel>
                <select {...register("boat_class")}>
                  <option value="">選択してください</option>
                  <option value="470">470</option>
                  <option value="Snipe">Snipe</option>
                </select>
              </Field>
              <Field>
                {errors.map((error) => (
                  <p key={error} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
                <Button type="submit">登録</Button>
                <FieldDescription className="text-center">
                  <Link to="/login">ログインページ</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
