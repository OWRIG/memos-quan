import { Button } from "@mui/joy";
import { ArrowDownIcon, LoaderIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import Empty from "@/components/Empty";
import { DEFAULT_LIST_MEMOS_PAGE_SIZE } from "@/helpers/consts";
import useResponsiveWidth from "@/hooks/useResponsiveWidth";
import { useMemoList, useMemoStore } from "@/store/v1";
import { useTranslate } from "@/utils/i18n";
import MomentsItem from "../item";

const filter = "row_status == \"NORMAL\" && visibilities == ['PUBLIC']";

const MomentsContent = () => {
  const { md } = useResponsiveWidth();
  const t = useTranslate();
  const memoList = useMemoList();
  const memoStore = useMemoStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPageToken, setNextPageToken] = useState<string>("");

  const fetchMoreMemos = (nextPageToken: string) => {
    setLoading(true);
    memoStore
      .fetchMemos({
        filter: filter,
        pageSize: DEFAULT_LIST_MEMOS_PAGE_SIZE,
        pageToken: nextPageToken,
      })
      .then((response) => {
        setLoading(false);
        setNextPageToken(response.nextPageToken);
      });
  };

  const refreshList = useCallback(() => {
    memoList.reset();
    setNextPageToken("");
    fetchMoreMemos("");
  }, []);

  useEffect(() => {
    refreshList();
  }, []);

  const children = (
    <>
      {memoList.value.map((memo) => (
        <MomentsItem key={memo.name} memo={memo} />
      ))}
      {loading && (
        <div className="w-full flex flex-row justify-center items-center my-4">
          <LoaderIcon className="animate-spin text-zinc-500" />
        </div>
      )}
      {!loading && nextPageToken && (
        <div className="w-full flex flex-row justify-center items-center my-4">
          <Button variant="plain" onClick={() => fetchMoreMemos(nextPageToken)}>
            {t("memo.load-more")}
            <ArrowDownIcon className="ml-2 w-4 h-auto" />
          </Button>
        </div>
      )}
      {!loading && !nextPageToken && memoList.value.length === 0 && (
        <div className="w-full mt-12 mb-8 flex flex-col justify-center items-center italic">
          <Empty />
          <p className="mt-2 text-gray-600 dark:text-gray-400">{t("message.no-data")}</p>
        </div>
      )}
    </>
  );
  return (
    <div className="w-full h-auto bg-white sm:mb-2">
      {md && <>{children}</>}
      {!md && (
        <PullToRefresh
          onRefresh={async () => refreshList()}
          pullingContent={
            <div className="w-full flex flex-row justify-center items-center my-4">
              <LoaderIcon className="opacity-60" />
            </div>
          }
          refreshingContent={
            <div className="w-full flex flex-row justify-center items-center my-4">
              <LoaderIcon className="animate-spin" />
            </div>
          }
        >
          {children}
        </PullToRefresh>
      )}
    </div>
  );
};

export default MomentsContent;
