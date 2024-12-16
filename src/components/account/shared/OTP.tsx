/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorNumber } from "@/common/general";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast";
import { verifyOTP } from "@/store/auth/actions";
import { formatTime } from "@/utils";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Check, PencilOff, RouteOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

type OTPProps = {
  openDialog: boolean;
  email: string;
  timeOut: number;
  resendOTP?: (i: any) => void;
  handleForward?: (i: any) => void;
}

export function OTP({ openDialog, email, timeOut, resendOTP, handleForward }: OTPProps) {
  const [value, setValue] = useState("")
  const [open, setOpen] = useState(openDialog);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const t = useTranslations('Account');
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const expirationTime = localStorage.getItem("otpExpirationTime");
    const currentTime = Math.floor(Date.now() / 1000);

    if (expirationTime) {
      const remainingTime = Number(expirationTime) - currentTime;
      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
      } else {
        setTimeLeft(0);
      }
    } else {
      const newExpirationTime = currentTime + timeOut;
      localStorage.setItem("otpExpirationTime", newExpirationTime.toString());
      setTimeLeft(timeOut);
    }
  }, [timeOut]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      localStorage.removeItem("otpExpirationTime");
    }
  }, [timeLeft]);

  useEffect(() => {
    if (value.length === 6) {
      dispatch(verifyOTP({
        data: {
          email: email,
          otp: value,
        },
        setError: (error) => {
          if(error.status >= ErrorNumber.ErrorCode) {
            toast({
              title: t("profile.error.title"),
              description: <div className="flex items-center justify-start">
                <PencilOff className="mr-5 text-red-500"/>{t("profile.error.descriptionVerifyOTP")}
              </div>,
            })
          }
        },
        setSuccess: (success) => {
          if(success.status === ErrorNumber.Success) {
            setOpen(false);
            handleForward && handleForward(true);
            toast({
              title: t("profile.success.title"),
              description: <div className="flex items-center justify-start">
                <Check className="mr-5 text-emerald-500"/>{t("profile.success.descriptionVerifyOTP")}
              </div>,
            })
          } else if (success.status === ErrorNumber.Expired) {
            setValue("");
            toast({
              title: t("profile.success.titleNotice"),
              description: <div className="flex items-center justify-start">
                <RouteOff className="mr-5 text-yellow-500"/>{t("profile.success.descriptionOTP402")}
              </div>,
            })
          } else if (success.status === ErrorNumber.Unauthorized) {
            setValue("");
            toast({
              title: t("profile.success.titleNotice"),
              description: <div className="flex items-center justify-start">
                <RouteOff className="mr-5 text-yellow-500"/>{t("profile.success.descriptionOTP401")}
              </div>,
            })
          }
        },
      }))
    }
  }, [value])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("profile.otp.title")}</DialogTitle>
          <DialogDescription>
            {t("profile.otp.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex items-center justify-center">
          <InputOTP 
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <DialogFooter>
          <div className="w-full flex items-center justify-between">
            <span className="text-sky-500">
              {t("profile.otp.timeRemaining")}: {formatTime(timeLeft)}
            </span>
            {resendOTP && 
            <Button 
              variant={"link"} 
              onClick={() => {
                setValue("");
                resendOTP(email);
              }}
              className="text-sky-500"
            >
              {t("profile.otp.resendOTP")}
            </Button>}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
